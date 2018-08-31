Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "pages#root"
  resources :people, only: [:create, :show]
  resources :species, only: [:create, :show]
end
