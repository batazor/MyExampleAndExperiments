Rails.application.routes.draw do

  get '/post/:id', to: 'post#index', :as => 'post_index'

  resources :post do
    resources :comments
  end

  devise_for :users

  devise_scope :user do
    get "admin", to: "devise/sessions#new"
  end

  namespace :admin do
    resources :categories, :posts
  end

  scope '/admin' do
    get '/main', to: 'admin#main'
  end

  root 'welcome#index'
end
