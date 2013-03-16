require 'nokogiri'
require 'open-uri'
require 'uri'

# == Schema Information
#
# Table name: microposts
#
#  id         :integer         not null, primary key
#  title      :string(255)
#  url        :string(255)
#  image_url  :string(255)
#  content    :string(255)
#  user_id    :integer         not null in theory
#  meds       :integer         default:0
#  created_at :datetime        not null
#  updated_at :datetime        not null
#
class Micropost < ActiveRecord::Base
  acts_as_commentable
  has_many :comments
  has_one :medchannel
  attr_accessible :content, :title, :urls, :image,:medtype, :remote_image_url,:medchannel,:preview_url
  before_save :create_preview,:lazy_user,:clean_input
  belongs_to :user
  has_many :relationshiprs, foreign_key: "post_id", dependent: :destroy
  has_many :channels, through: :relationshiprs, source: :channel
  has_many :reposters, through: :relationshiprs, source: :poster
  default_scope order:'microposts.created_at DESC'
  #relationshipl
  has_many :reverse_relationshipls,foreign_key: "liked_id",class_name:"Relationshipl", dependent: :destroy
  has_many :likers, through: :reverse_relationshipls,source: :liker

  #3medtypes of microposts medimage, medself, medlink and repost quivalents
  mount_uploader :image, ImageUploader
  validate :ultra_val
  def self.from_users_followed_by(user)
    followed_user_ids = "SELECT followed_id FROM relationships WHERE follower_id = :user_id"
    where("user_id IN (#{followed_user_ids}) OR user_id = :user_id", user_id: user.id)
  end
  def self.default_feed
    #must improve
   Micropost.select("*").where(:medtype=>['image_post','link_post','self_post'])
  end
  #takes the user, takes the channel the user is currently in and the popularity
  #and returns a feed ordered by the meds
   def next#should refine to model it out of users feed
    Micropost.where("id > ?", id).where(:medtype=>['image_post','link_post','self_post']).order("id DESC").first
  end

  def prev#should refine to model it out of users feed
    Micropost.where("id < ?", id).where(:medtype=>['image_post','link_post','self_post']).order("id ASC").first
  end
  def self.calculate_feed(user,medchannel,popularity,default=false)
    microposts=[]
    id=[]
    if popularity==:hall_of_fame  #only one outcome if we request the hall of fame and thats the top 10 posts of all time
      microposts=Micropost.order("meds DESC").limit(10)
      return microposts
    end
    microposts=medchannel.posts unless medchannel.nil? #get posts from the medchannel if we are in one
    user.followed_users.each{|user| microposts<<user.microposts } unless user.nil? #if the user is logged in get posts from users he's following
    user.medchannels.each{|channel| microposts<<channel.posts } if default
    microposts.flatten.each{|post| id<<post.id}
    case popularity
    when :popular
      microposts=Micropost.where(:id=>id,:created_at => (1.days.ago.to_date)..(12.hours.ago.to_date),:medtype=>['image_post','link_post','self_post']).order("meds DESC")
    when :rising
    microposts=Micropost.where(:id=>id,:created_at => (12.hours.ago.to_date)..(4.hours.ago.to_date),:medtype=>['image_post','link_post','self_post']).order("meds DESC")
    when :new
       microposts=Micropost.where(:id=>id,:created_at => (4.hours.ago.to_date)..(Time.now.to_date),:medtype=>['image_post','link_post','self_post']).order("meds DESC")
    end
    microposts
  end
  def in_channel?(medchannel)
    unless relationshiprs.find_by_channel_id(medchannel.id).nil?
     true
   else
     false
    end 
  end
  def inc 
   self.update_attribute(:meds,meds+1)
  end
  def dec
    self.update_attribute(:meds,meds-1)
  end
  def top_comment
    comment_threads.order("meds DESC").first
  end
  def top_comment?(comment)
    comment_threads.order("meds DESC").first.id==comment.id
  end
  def most_replied
        mostreplied=self.comment_threads.first
    self.comment_threads.each{|comment|
      if comment.children.size>mostreplied.children.size
      mostreplied=comment
     end
     }
     mostreplied
  end
  def most_replied?(comment)
      self.most_replied==comment
  end
  private #validations
    def ultra_val
    if medtype=="link_post"
     errors[:base]<<("Uhh, you sure that's a website?")  if urls.nil? or !URI::DEFAULT_PARSER.regexp[:ABS_URI].match(urls) 
    elsif medtype=="self_post"
      errors[:base]<<("Woah say something")  if content.nil? or content.length <4 
      errors[:base]<<("Woah you're saying way too much in your post") if content.length > 1000
    elsif medtype=="image_post"
      errors[:base]<<("Hey, can you upload something already") if image.nil?
    elsif medtype!="desc"
      errors[:base]<<("Something, went wrong with your post and we're tearing out our heads trying to find why")
    end
    unless medtype=="self_post" or medtype=="desc"
    errors[:base]<<("Your title is very important, please be a bit more expressive") if title.nil? or title.length <4
    errors[:base]<<("Woah your title is way too long") if title.length >100
    end
    unless medtype=="desc"
       errors[:base]<<("uhh, login first?") if user_id.nil? 
    end
  end
  def create_preview
    if medtype=="link_post"
      unless preview_url.nil?
        return preview_url
      end
      doc = Nokogiri::HTML(open(urls))
      max_size=0;
      doc.css('img').each {|image|
        unless /\A(http:\/\/).+\.(gif|png|jpe?g)\z/.match(image['src']).nil?
          if image['height'].to_i>max_size
            self.preview_url=image['src']
            max_size=image['height'].to_i
          end
        end
      }
    end
  end
  def lazy_user
    unless medtype=="link_post"
      self.urls="/microposts/"+id.to_s
    end
    if medtype=="desc" then return true end
  end
  def clean_input
    if medtype=="desc" then return true end
    unless self.content.nil?
    self.content=ActionController::Base.helpers.sanitize(content)
    end
  end
end
