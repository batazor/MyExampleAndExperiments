class WelcomeController < ApplicationController
  def main
    @b = Admin::Category.all
  end
end
