# -*- coding: utf-8 -*-
from odoo import http

class Worker(http.Controller):

    @http.route('/worker')
    def Main(self, **kwargs):
        return http.request.render(
            'worker_app.index_template')
