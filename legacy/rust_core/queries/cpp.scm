(class_specifier name: (type_identifier) @name) @definition.class
(function_definition declarator: (function_declarator declarator: (identifier) @name)) @definition.function
(struct_specifier name: (type_identifier) @name) @definition.struct

(call_expression function: (identifier) @name) @reference.call
(field_expression field: (field_identifier) @name) @reference.call
