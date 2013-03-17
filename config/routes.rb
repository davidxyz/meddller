SampleApp::Application.routes.draw do
  resources :users, only: [:destroy,:create]
  resources :sessions, only: [:new, :create, :destroy]
 # resources :microposts, only: [:create, :destroy]
 resources :microposts
  resources :relationships, only: [:create, :destroy]
  resources :relationshipls, only: [:create, :destroy]
  resources :comments, only: [:destroy]
  
  match '/signin', to: 'sessions#new'
  match '/signout', to: 'sessions#destroy'
  root to: 'static_pages#home'
  match '/help', to: 'static_pages#help'
  match '/about', to: 'static_pages#about'
  match '/contact', to: 'static_pages#contact'
  match '/AskTheMedTeam', to: 'static_pages#ask'
  match '/users/:name'=> 'users#show',:name => /[a-z0-9_]+/i
  match '/users/:id/edit'=> 'users#edit'
  match '/GodCommands/index_that_shit', to: 'Users#index'
  match '/signup', to: 'users#new'
  match '/submit', to: 'microposts#new'
  match '/submit2', to: 'microposts#new2'
  match '/submit3', to: 'microposts#new3'
  match '/show_urls', to: 'microposts#show_urls'
  match '/commands/inc', to: 'microposts#increment'
  match '/commands/inc_a_comment', to: 'comments#increment'
  match '/commands/create_a_comment', to: 'comments#create'
  match '/commands/repost', to: 'microposts#repost'
  match '/commands/no_other_users', to: 'users#no_other_users'
  match '/commands/no_other_emails', to: 'users#no_other_emails'
  match '/commands/subscribe', to: 'medchannels#subscribe'
  #medchannnel routes
  match '/medchannel/:name'=> 'medchannels#show',:name => /[a-z_]+/i
  match '/m/:name'=> 'medchannels#show',:name => /[a-z_]+/i
  match '/m/:name/description'=> 'medchannels#desc',:name => /[a-z_]+/i
  match '/medchannel/:name/description'=> 'medchannels#desc',:name => /[a-z_]+/i
  match '/medchannel/:name/hall_of_fame', to: "medchannels#hall_of_fame",:name => /[a-z_]+/i
  match '/medchannel/:name/new', to: "medchannels#newposts",:name => /[a-z_]+/i
  match '/medchannel/:name/popular', to: "medchannels#popularposts",:name => /[a-z_]+/i
  match '/medchannel/:name/rising', to: "medchannels#risingposts",:name => /[a-z_]+/i
  match '/m/:name/hall_of_fame', to: "medchannels#hall_of_fame",:name => /[a-z_]+/i
  match '/m/:name/new', to: "medchannels#newposts",:name => /[a-z_]+/i
  match '/m/:name/popular', to: "medchannels#popularposts",:name => /[a-z_]+/i
  match '/m/:name/rising', to: "medchannels#risingposts",:name => /[a-z_]+/i
  #routes
  match '/hall_of_fame', to: "static_pages#hall_of_fame"
  match '/new', to: "static_pages#newposts"
  match '/popular', to: "static_pages#home"
  match '/rising', to: "static_pages#risingposts"
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
