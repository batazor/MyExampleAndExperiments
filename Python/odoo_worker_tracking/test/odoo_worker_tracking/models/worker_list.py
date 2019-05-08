from odoo import api, fields, models


class WorkerTask(models.Model):
    _name = 'workertracking.list'

    name = fields.Char(string="Platform id", required=True)
