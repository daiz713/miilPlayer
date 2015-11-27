require 'json'

require './app/controllers/save_miil_raw.rb'

def scan_miilcategories_photos (json)
    hash = JSON.parse(json)
    save_miil_raw(hash)

    puts hash['photos'].size
end
