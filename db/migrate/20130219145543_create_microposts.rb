class CreateMicroposts < ActiveRecord::Migration
  def up
    create_table :microposts do |t|
      t.text :content
      t.integer :user_id
      t.string  :image_url
      t.string  :type
      t.string  :local_image_url
      t.string  :title
      t.integer :meds, :integer, :default=>1
      t.string :urls

      t.timestamps
    end
  add_index :microposts, [:user_id, :created_at]
 end
 def down
   drop_table :microposts
 end
end
