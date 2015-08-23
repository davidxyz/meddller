# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130331125035) do

  create_table "comments", :force => true do |t|
    t.integer  "commentable_id",   :default => 0
    t.string   "commentable_type", :default => ""
    t.text     "body",             :default => ""
    t.integer  "meds",             :default => 1
    t.integer  "user_id",          :default => 0,  :null => false
    t.integer  "parent_id"
    t.integer  "lft"
    t.integer  "rgt"
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
  end

  add_index "comments", ["commentable_id"], :name => "index_comments_on_commentable_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

  create_table "med_groups", :force => true do |t|
    t.string   "name",       :default => "random"
    t.integer  "followers",  :default => 0
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
  end

  add_index "med_groups", ["name"], :name => "index_med_groups_on_name"

  create_table "medchannels", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.boolean  "nsfw"
  end

  create_table "microposts", :force => true do |t|
    t.text     "content"
    t.integer  "user_id"
    t.string   "type"
    t.string   "local_image_url"
    t.string   "title"
    t.integer  "meds",            :default => 1
    t.integer  "integer",         :default => 1
    t.string   "urls"
    t.datetime "created_at",                               :null => false
    t.datetime "updated_at",                               :null => false
    t.string   "preview_url"
    t.integer  "medchannel_id"
    t.string   "medtype",         :default => "self_post"
  end

  add_index "microposts", ["user_id", "created_at"], :name => "index_microposts_on_user_id_and_created_at"

  create_table "relationshipls", :force => true do |t|
    t.integer  "liker_id"
    t.integer  "liked_id"
    t.string   "uptype"
    t.string   "posttype"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "relationshipls", ["liked_id"], :name => "index_relationshipls_on_liked_id"
  add_index "relationshipls", ["liker_id", "liked_id", "posttype"], :name => "index_relationshipls_on_liker_id_and_liked_id_and_posttype", :unique => true
  add_index "relationshipls", ["liker_id"], :name => "index_relationshipls_on_liker_id"
  add_index "relationshipls", ["posttype"], :name => "index_relationshipls_on_posttype"

  create_table "relationshipms", :force => true do |t|
    t.integer  "subscriber_id"
    t.integer  "subscribed_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "relationshipms", ["subscribed_id", "subscriber_id"], :name => "index_relationshipms_on_subscribed_id_and_subscriber_id", :unique => true
  add_index "relationshipms", ["subscribed_id"], :name => "index_relationshipms_on_subscribed_id"
  add_index "relationshipms", ["subscriber_id"], :name => "index_relationshipms_on_subscriber_id"

  create_table "relationshiprs", :force => true do |t|
    t.integer "channel_id"
    t.integer "post_id"
    t.integer "poster_id"
  end

  add_index "relationshiprs", ["channel_id", "post_id"], :name => "index_relationshiprs_on_channel_id_and_post_id", :unique => true
  add_index "relationshiprs", ["channel_id"], :name => "index_relationshiprs_on_channel_id"
  add_index "relationshiprs", ["post_id", "poster_id"], :name => "index_relationshiprs_on_post_id_and_poster_id", :unique => true
  add_index "relationshiprs", ["post_id"], :name => "index_relationshiprs_on_post_id"
  add_index "relationshiprs", ["poster_id"], :name => "index_relationshiprs_on_poster_id"

  create_table "relationships", :force => true do |t|
    t.integer  "follower_id"
    t.integer  "followed_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "relationships", ["followed_id"], :name => "index_relationships_on_followed_id"
  add_index "relationships", ["follower_id", "followed_id"], :name => "index_relationships_on_follower_id_and_followed_id", :unique => true
  add_index "relationships", ["follower_id"], :name => "index_relationships_on_follower_id"

  create_table "relationships_groups", :force => true do |t|
    t.integer  "suscriber_id"
    t.integer  "med_group_id"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "relationships_groups", ["med_group_id"], :name => "index_relationships_groups_on_med_group_id"
  add_index "relationships_groups", ["suscriber_id", "med_group_id"], :name => "index_relationships_groups_on_suscriber_id_and_med_group_id", :unique => true
  add_index "relationships_groups", ["suscriber_id"], :name => "index_relationships_groups_on_suscriber_id"

  create_table "relationships_m", :force => true do |t|
    t.integer  "subscriber_id"
    t.integer  "subscribed_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "relationships_m", ["subscribed_id"], :name => "index_relationships_m_on_subscribed_id"
  add_index "relationships_m", ["subscriber_id", "subscribed_id"], :name => "index_relationships_m_on_subscriber_id_and_subscribed_id", :unique => true
  add_index "relationships_m", ["subscriber_id"], :name => "index_relationships_m_on_subscriber_id"

  create_table "sessions", :force => true do |t|
    t.string   "session_id", :null => false
    t.text     "data"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
    t.string   "password_digest"
    t.string   "remember_token"
    t.boolean  "admin",           :default => false
    t.integer  "meds",            :default => 0
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["name"], :name => "index_users_on_name"
  add_index "users", ["remember_token"], :name => "index_users_on_remember_token"

end
