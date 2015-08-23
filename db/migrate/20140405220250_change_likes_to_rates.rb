class ChangeLikesToRates < ActiveRecord::Migration
  def up
  	create_table :relationshiprates do |t|
    t.integer :rater_id
    t.integer :rated_id
    t.integer :rate_value
    t.timestamps
  end

    add_index :relationshiprates, :rater_id
    add_index :relationshiprates,:rated_id
    add_index :relationshiprates,[:rater_id, :rated_id], :unique=>true
    add_index :relationshiprates,[:rated_id,:rater_id], :unique=>true
  end

  def down
  	drop_table :relationshiprs
  end
end
