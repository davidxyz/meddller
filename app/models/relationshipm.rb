class Relationshipm < ActiveRecord::Base
  # subscriber_id=user_id, subscribed_id=medchannel_id
  attr_accessible :subscribed_id
    belongs_to :subscriber, class_name: "User"
    belongs_to :subscribed, class_name: "Medchannel"
    validates :subscriber_id, presence: true
    validates :subscribed_id, presence: true
end
