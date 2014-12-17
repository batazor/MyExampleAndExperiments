Category.delete_all
Category.create(title: 'Default',
                description: '<p>default category</p>',
                id: 1)

Post.delete_all
Post.create(title: 'Hello World',
            text: '<p>Hello! I\'m simple blog service.</p>',
            category_id: 1)

User.delete_all
User.create(email: 'admin@admin.com',
            password: 'admin123',
            password_confirmation: 'admin123')

Setting.delete_all
Setting.create(id: 1,
               url_pattern: "post_id")
