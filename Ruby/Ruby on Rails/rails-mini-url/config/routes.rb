Rails.application.routes.draw do
  resources :links

  get ':id' => 'links#redirect'

  root 'welcome#index'
end
