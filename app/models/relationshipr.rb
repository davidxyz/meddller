class Relationshipr < ActiveRecord::Base
	attr_accessible :channel_id,:post_id
	belongs_to :channel, class_name:"Medchannel"
	belongs_to :post, class_name: "Micropost"
	belongs_to :poster, class_name: "User"
	validates :channel_id, presence: true
	validates :post_id, presence: true
	validates :poster_id, presence: true
end