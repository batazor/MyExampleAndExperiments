# -*- coding: utf-8 -*-
from odoo import http

# class AddField(http.Controller):
#     @http.route('/add_field/add_field/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/add_field/add_field/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('add_field.listing', {
#             'root': '/add_field/add_field',
#             'objects': http.request.env['add_field.add_field'].search([]),
#         })

#     @http.route('/add_field/add_field/objects/<model("add_field.add_field"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('add_field.object', {
#             'object': obj
#         })