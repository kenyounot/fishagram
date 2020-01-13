Rails.application.routes.draw do

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :posts, only: [:index, :create, :update, :destroy]
      resources :comments, only: [:create, :update, :delete]
    end
  end

  root to: "static#home"

end
