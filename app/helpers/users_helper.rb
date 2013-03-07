module UsersHelper
  
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

  def user_ready?
    user_time_left==0
  end
  def user_time_left
    begin
    time=(Time.now-(current_user.comments.find(:first,order: "created_at DESC").created_at))
      if time<=60
        time
      else
        0
      end
    rescue
        0
    end
  end
end
