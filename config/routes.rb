Rails.application.routes.draw do

  devise_for :users

  devise_scope :user do
    get "admin", to: "devise/sessions#new"
  end

  namespace :admin do
    resources :categories
  end

  scope '/admin' do
    get '/main', to: 'admin#main'
  end

  root 'welcome#main'
end
