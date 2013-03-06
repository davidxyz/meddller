class Relationshiprs < ActiveRecord::Migration
  def up
  	create_table :relationshiprs do |t|
  		t.integer :channel_id
  		t.integer :post_id
  		t.timestamp
  	end
  	add_index :relationshiprs, :channel_id
    add_index :relationshiprs, :post_id
    add_index :relationshiprs,[:channel_id, :post_id], :unique=>true
  end

  def down
  	drop_table :relationshiprs
  end
end
