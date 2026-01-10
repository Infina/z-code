// rust_core/crates/architect/src/pagerank.rs

use std::collections::HashMap;
use petgraph::graph::NodeIndex;
use petgraph::visit::EdgeRef;
use petgraph::Direction;

/// 配置 PageRank 的参数
pub struct PageRankConfig {
    pub damping_factor: f64,
    pub tolerance: f64,
    pub max_iterations: usize,
}

impl Default for PageRankConfig {
    fn default() -> Self {
        Self {
            damping_factor: 0.85,
            tolerance: 1e-6,
            max_iterations: 100,
        }
    }
}

/// 计算 Personalized PageRank
///
/// * `graph`: 依赖图，权重通常代表引用强度
/// * `personalization`: 个性化向量 (NodeIndex -> Weight)，代表用户的关注点 (Focus)
/// * `config`: 算法参数
pub fn personalized_pagerank<N, E>(
    graph: &petgraph::Graph<N, E>,
    personalization: Option<&HashMap<NodeIndex, f64>>,
    config: PageRankConfig,
) -> HashMap<NodeIndex, f64> 
where 
    E: Copy + Into<f64>, // 边权重必须能转为 f64
{
    let node_count = graph.node_count();
    if node_count == 0 {
        return HashMap::new();
    }

    // 1. 初始化 Rank 向量
    // 如果没有个性化向量，则退化为均匀分布 (Standard PageRank)
    let initial_val = 1.0 / node_count as f64;
    let mut rank = vec![initial_val; node_count];
    let mut new_rank = vec![0.0; node_count];

    // 预处理个性化向量的总权重，用于归一化
    let p_sum = if let Some(p) = personalization {
        p.values().sum::<f64>()
    } else {
        0.0
    };

    // 迭代计算 (Power Iteration)
    for _iter in 0..config.max_iterations {
        let mut diff = 0.0;
        
        // 计算 Dangling Nodes (无出度的节点) 的总 Rank
        let mut dangling_mass = 0.0;
        for node in graph.node_indices() {
            if graph.edges_directed(node, Direction::Outgoing).count() == 0 {
                dangling_mass += rank[node.index()];
            }
        }

        for node in graph.node_indices() {
            let idx = node.index();
            
            // Term 1: Teleportation (随机跳转)
            let v_i = if let Some(p) = personalization {
                if p_sum > 0.0 {
                    *p.get(&node).unwrap_or(&0.0) / p_sum
                } else {
                    1.0 / node_count as f64
                }
            } else {
                1.0 / node_count as f64
            };

            let jump_term = (1.0 - config.damping_factor) * v_i;

            // Term 2: Dangling Node Redistribution (悬挂节点重分配)
            let dangling_term = config.damping_factor * dangling_mass * v_i;

            // Term 3: Link Propagation (链路传播)
            let mut link_term = 0.0;
            for edge in graph.edges_directed(node, Direction::Incoming) {
                let source = edge.source();
                let source_idx = source.index();
                
                let edge_weight: f64 = (*edge.weight()).into();
                
                let total_out_weight: f64 = graph
                    .edges_directed(source, Direction::Outgoing)
                    .map(|e| (*e.weight()).into())
                    .sum();

                if total_out_weight > 0.0 {
                    link_term += rank[source_idx] * (edge_weight / total_out_weight);
                }
            }

            let val = jump_term + dangling_term + (config.damping_factor * link_term);
            
            diff += (val - rank[idx]).abs();
            new_rank[idx] = val;
        }

        // 更新 Rank
        rank.copy_from_slice(&new_rank);

        // 检查收敛
        if diff < config.tolerance {
            break;
        }
    }

    // 转换结果为 HashMap
    let mut result = HashMap::new();
    for node in graph.node_indices() {
        result.insert(node, rank[node.index()]);
    }
    result
}
