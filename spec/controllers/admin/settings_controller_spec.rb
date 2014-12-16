require 'rails_helper'

RSpec.describe Admin::SettingsController, :type => :controller do

  describe "GET url" do
    it "returns http success" do
      get :url
      expect(response).to have_http_status(:success)
    end
  end

end
