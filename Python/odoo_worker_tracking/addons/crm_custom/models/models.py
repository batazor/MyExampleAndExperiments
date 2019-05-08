# -*- coding: utf-8 -*-

from odoo import models, fields, api

class CRMLeadCustom(models.Model):
    # _name = 'crm.lead'
    _inherit = 'crm.lead'

    mrr = fields.Char(string="MRR", required=True)

# class crm_custom(models.Model):
#     _name = 'crm_custom.crm_custom'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         self.value2 = float(self.value) / 100
