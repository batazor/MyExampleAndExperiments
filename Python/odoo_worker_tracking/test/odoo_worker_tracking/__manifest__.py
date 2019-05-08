# -*- coding: utf-8 -*-
{
    'name': "odoo_worker_tracking",

    'description': """
        Visualization of data on employees
    """,

    'author': "@batazor",
    'website': "https://rightech.io",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.16',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    'installable': True,
    'auto_install': True,
    'application': True,
    'active': True,

    # always loaded
    'data': [
        'views/index_template.xml',
        'views/main_menu.xml',
    ],
}
