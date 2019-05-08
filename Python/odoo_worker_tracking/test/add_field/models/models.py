# -*- coding: utf-8 -*-

import logging
from odoo import models, fields, api

_logger = logging.getLogger(__name__)

# class add_field(models.Model):
#     _name = 'add_field.add_field'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         self.value2 = float(self.value) / 100

class WorkerTask(models.Model):
    _inherit = 'workertracking.list'

    label = fields.Char(string="Label id", required=True)

    # @api.model
    # def my_first_crone(self, cr, uid, ids, context):
    #     print('HelloWWW')
    #     _logger.info('Hello!!!!!!')
    #     id = env['workertracking.list'].sudo().create({'name': "A Partner"})
    #     _logger.debug('Create a %s with vals %s', self._name, id)
        # id = models.execute_kw(db, uid, password, 'workertracking.list', 'create', [{
        #     'name': "New Partner",
        #     'label': "New Partner",
        # }])

        # self.env.cr.execute('INSERT INTO workertracking.list (label,name) VALUES (test,test)')
        # self.env.cr.execute('INSERT INTO workertracking_list (label,name) VALUES (test,test)')
        #
        # record = super(WorkerTask, self).create({
        #     'label':'test',
        #     'name':'test name'
        # })
        #
        # self.env['workertracking.list'].create([{
        #     'name': "New Partner",
        #     'label': "New Partner",
        # }])
        #
        # self.env['workertracking_list'].create([{
        #     'name': "New Partner",
        #     'label': "New Partner",
        # }])
        # self.write(cr, uid, ids, { label:'test', name:'test' })

    # @api.multi
    # def insert_worker(self, values):
    #     print('insert_worker crone')
        # self.env['workertracking.list'].create({'label':'test', 'name':'test name'})
        # record = super(WorkerTask, self).create(values)
