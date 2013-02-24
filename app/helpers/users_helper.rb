module UsersHelper
  def gravatar_for(user)
    gravatar_id=Digest::MD5::hexdigest(user.email.downcase)
    gravatar_url = "https://secure.gravatar.com/avatars/#{gravatar_id}.png"
    image_tag(gravatar_url, alt: user.name, class: "gravatar")
  end
  def calculateRank(user)
    rank=""
    #first part of rank algorithm
    case user.microposts.count
    when 0..10
      #nothing
    when 11..50
     rank+="active "
    when 50..Infinity
      rank+="hyper active "
    else
      #nothing
    end
    #second part of rank algorithm
    case user.meds
    when 0..50
      rank+="small fry"
    when 50..350
     rank+="popular"
    when 350..Infinity
      rank+="popular"
    else
      #nothing
    end
    rank
  end
end
