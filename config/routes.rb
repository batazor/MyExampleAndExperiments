Rails.application.routes.draw do

  get 'feeds', to: 'welcome#rss', format: 'rss'

  get '/post/:id', to: 'post#index', :as => 'post_id'
  get '/post/:date/:title', to: 'post#index', :as => 'post_date_title'
  get 'tags/:tag', to: 'welcome#index', as: :ta

  resources :post do
    resources :comments, only: [:create, :destroy]
  end

  devise_for :users

  devise_scope :user do
    get "admin", to: "devise/sessions#new"
  end

  namespace :admin do
    resources :categories, :posts, :tags
    get 'settings/url'
    patch 'settings/url', to: 'settings#update_url'
  end

  scope '/admin' do
    get '/main', to: 'admin#main'
  end

  root 'welcome#index'
end
