pub struct User {
    pub id: u32,
    pub name: String,
}

impl User {
    pub fn save(&self) {
        let db = crate::db::Database::connect();
        db.query();
    }
}
