class Relationshipms < ActiveRecord::Migration
  def up
  create_table :relationshipms do |t|
	t.integer :subscriber_id
    t.integer :subscribed_id
    t.timestamps
  end
  add_index :relationshipms, :subscriber_id
    add_index :relationshipms, :subscribed_id
    add_index :relationshipms, [:subscribed_id, :subscriber_id], unique: true
end

  def down
  	drop_table :relationshipms
  end
end
