module Admin::SettingsHelper
  def url_example parameters
    request.protocol + request.host_with_port + parameters
  end
end
