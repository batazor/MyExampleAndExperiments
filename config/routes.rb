Rails.application.routes.draw do
  devise_for :users

  devise_scope :user do
    get "admin", to: "devise/sessions#new"
  end

  root 'welcome#main'
end
