class CreateMedchannels < ActiveRecord::Migration
  def change
    create_table :medchannels do |t|
    t.string :name
    t.text :description
    t.text :rules
    t.timestamps
    end
    create_table :relationships_m do |t|
    t.integer :subscriber_id
    t.integer :subscribed_id
    t.timestamps
    end
    add_index :relationships_m, :subscriber_id
    add_index :relationships_m, :subscribed_id
    add_index :relationships_m, [:subscriber_id, :subscribed_id], unique: true
  end
end
