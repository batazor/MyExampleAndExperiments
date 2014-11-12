Rails.application.routes.draw do
  devise_for :users
  
  root 'welcome#main'
end
