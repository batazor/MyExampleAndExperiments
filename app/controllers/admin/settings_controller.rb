class Admin::SettingsController < ApplicationController
  layout "admin"

  def url
    @url = Setting.find(1)
  end

  def update_url
    @url = Setting.find(1)
    if @url.update(url_pattern: params[:url_pattern])
      redirect_to admin_settings_url_path
    else
      redirect_to admin_settings_url_path
    end
  end
end
