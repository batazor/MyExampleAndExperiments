Category.delete_all
Category.create(title: 'Default',
                description: '<p>default category</p>',
                id: 1)

Post.delete_all
Post.create(title: 'Hello World',
            text: '<p>Hello! I\'m simple blog service.</p>',
            category_id: 1)

User.delete_all
User.create(id: 1,
            email: 'admin@admin.com',
            encrypted_password: '$2a$10$PY3IrDRZIKobZbzODFxy6OcTMm/ZIA9yKUSIinREeleYr1PMGDqJ2')
