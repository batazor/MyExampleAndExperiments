from odoo import api, fields, models

# PARAMS = [
#     ("login", "workertracking.login"),
#     ("password", "workertracking.password"),
# ]

class WorkerConfig(models.Model):
    _name = 'workertracking.config'

    name = fields.Char(string="User", required=True)
    login = fields.Char(string="Login", required=True)
    password = fields.Char(string="Password", required=True)


    # # Cron job method
    # @api.model
    # def refresh_tokens(self):
    #     config = self.env['app.api_config'].search(['active', '=', True])
    #     client = config.get_client()
    #     api = api_class(client, config.athority, config.redirect_url, config.scopes)
    #
    #     for record in self:
    #         _logger.warning(record.refresh_token)
    #         tokens = api.refreshaccess_tokens(record.refresh_token)
    #         _logger.warning(tokens)
    #         record.save_tokens(tokens.get('access_token'), tokens.get('refresh_token'))
    #
    # # Method of the button
    # @api.multi
    # def refresh_tokens(self):
    #     self.refresh_tokens()

    # @api.multi
    # def set_params(self):
    #     self.ensure_one()
    #
    #     for field_name, key_name in PARAMS:
    #         value = getattr(self, field_name, '').strip()
    #         self.env['ir.config_parameter'].set_param(key_name, value)
    #
    # def get_default_params(self, cr, uid, fields, context=None):
    #     res = {}
    #     for field_name, key_name in PARAMS:
    #         res[field_name] = self.env['ir.config_parameter'].get_param(key_name, '').strip()
    #     return res

class ModelName(models.Model):
    _name = "workertracking.cron"

    fields_name = fields.Char(string=" ")

    # fields
    def method_name(self, cr, uid, context=None):pass
        # your code

    @api.model
    def Hello_cron(self):
        print("Hello World")

# class MyTask(models.Model):
#     _name = "workertracking.cron"
#
#     @api.model
#     def workertracking_cron_do_task(self, cr, uid, context=None):pass
#
#     @api.multi
#     def server_do_action(self):pass
