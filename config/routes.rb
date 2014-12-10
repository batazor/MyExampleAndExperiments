Rails.application.routes.draw do
  get '/post/:id', to: 'post#index', :as => 'post_index'
  get 'tags/:tag', to: 'welcome#index', as: :tag

  resources :post do
    resources :comments, only: [:create, :destroy]
  end

  devise_for :users

  devise_scope :user do
    get "admin", to: "devise/sessions#new"
  end

  namespace :admin do
    resources :categories, :posts, :tags
  end

  scope '/admin' do
    get '/main', to: 'admin#main'
  end

  root 'welcome#index'
end
