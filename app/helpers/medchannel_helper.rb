module MedchannelHelper
	def popularity(medchannel)
		case medchannel.subscribers.count
		when 0..50
			"#5bc0de"
		when 51..150
		when 151..250
		when 251..350
		else
		end	
	end
end