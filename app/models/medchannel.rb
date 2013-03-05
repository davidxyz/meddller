class Medchannel < ActiveRecord::Base
	#medchannel has nsfw
  attr_accessible :name, :description, :rules
  before_save{|medchannel| user.name=name.downcase}
  
  has_many :microposts
  has_many :reverse_relationshipms,foreign_key: "subscribed_id",class_name:"Relationshipm", dependent: :destroy
  has_many :subscribers, through: :reverse_relationshipms,source: :subscriber
  #only negroByte can make a new medchannel right now when i make it accesible to users ill take away attr accesible satus for the name
  validates :name, :presence=> true

def feed
  Micropost.where("medchannel_id = ?", self.id)
end
def desc
  Micropost.find(self.id,:medtype=>"desc")
end
end
