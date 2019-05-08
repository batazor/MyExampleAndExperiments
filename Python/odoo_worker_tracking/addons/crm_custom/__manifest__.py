# -*- coding: utf-8 -*-
{
    'name': "crm_custom",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",

    'description': """
        Long description of module's purpose 123
    """,

    'author': "My Company",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.12',

    # any module necessary for this one to work correctly
    'depends': ['base', 'crm'],

    'installable': True,
    'auto_install': False,
    'application': True,
    'active': False,

    # always loaded
    'data': [
        'views/templates.xml',
    ],
}
