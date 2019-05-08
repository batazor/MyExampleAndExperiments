# -*- coding: utf-8 -*-
from odoo import http

# class CrmCustom(http.Controller):
#     @http.route('/crm_custom/crm_custom/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/crm_custom/crm_custom/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('crm_custom.listing', {
#             'root': '/crm_custom/crm_custom',
#             'objects': http.request.env['crm_custom.crm_custom'].search([]),
#         })

#     @http.route('/crm_custom/crm_custom/objects/<model("crm_custom.crm_custom"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('crm_custom.object', {
#             'object': obj
#         })