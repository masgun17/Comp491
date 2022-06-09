## Parameters, thresholds and cutoff values can easily be changed here


## !!!!!!!!!! ABOUT YOUR HEALTH PART !!!!!!!!!!

## Scoring function for Agesex factor
## Returns Risk Score
def Agesex(anslist):
    try:
        ## parse the answer dictionary
        age = int(anslist["age"])
        sex = anslist["sex"]

        if sex == "Erkek":
            if age < 65:
                return 0
            elif age < 70:
                return 1
            elif age < 75:
                return 12
            elif age < 80:
                return 18
            elif age < 85:
                return 26
            elif age < 90:
                return 33
            elif age < 111:
                return 38
            else:
                return 40
        else:
            if age < 65:
                return 0
            elif age < 70:
                return 5
            elif age < 75:
                return 14
            elif age < 80:
                return 21
            elif age < 85:
                return 29
            elif age < 90:
                return 35
            elif age < 111:
                return 41
            else:
                return 45
    except Exception as e:
        print("Exception in Agesex")
        print(e)


## Scoring function for Education factor
## Returns Risk Score
def Education(anslist):
    try:
        ## parse the answer dictionary
        education_p = int(anslist["education_p"])
        education_h = int(anslist["education_h"])
        education_t = int(anslist["education_t"])
        education_u = int(anslist["education_u"])
        education_o = int(anslist["education_o"])
        sum = education_p + education_h + education_t + education_u + education_o
        if sum < 8:
            return 6
        elif sum < 12:
            return 3
        else:
            return 0
    except Exception as e:
        print("Exception in Education")
        print(e)


## Scoring function for BMI factor
## Returns Risk Score
def BMI(anslist):
    try:
        ## parse the answer dictionary
        age = int(anslist["age"])
        height_meters = int(anslist["height_meters"])
        weight_kg = int(anslist["weight_kg"])

        if (age>=18) and (age<=120):
            ratio = (weight_kg / (height_meters / 100 * height_meters / 100))
            if ratio <= 25:
                return 0
            elif ratio <= 30:
                return 2
            else:
                return 5
        else:
            # this case is not covered
            return 0
    except Exception as e:
        print("Exception in BMI")
        print(e)




## !!!!!!!!!! ABOUT YOUR HEALTH PART !!!!!!!!!!

## Scoring function for Cholesterol factor
## Returns Risk Score
def Cholesterol(anslist):
    try:
        ## parse the answer dictionary
        age = int(anslist["age"])
        cholesterol_level = int(anslist["cholesterol_level"])
        cholesterol = anslist["cholesterol"]

        if age > 60:
            if cholesterol == "Evet":
                return 3
            elif cholesterol == "Hayır":
                return 0
            elif cholesterol_level > 200:
                return 3
        else:
            # this case is not covered
            return 0
    except Exception as e:
        print("Exception in Cholesterol")
        print(e)


## Scoring function for Diabetes factor
## Returns Risk Score
def Diabetes(anslist):
    try:
        ## parse the answer dictionary
        diabetes = anslist["diabetes"]
        if diabetes == "Evet":
            return 3
        else:
            return 0
    except Exception as e:
        print("Exception in Diabetes")
        print(e)


## Scoring function for TBI factor
## Returns Risk Score
def TBI(anslist):
    try:
        ## parse the answer dictionary
        tbi = anslist["tbi"]
        tbi_time = anslist["tbi_time"]
        if tbi == "Evet":
            return 4
        else:
            return 0
    except Exception as e:
        print("Exception in TBI")
        print(e)


## Scoring function for Depression factor
## Returns Risk Score
def Depression(anslist):
    try:
        ## parse the answer dictionary
        cesd1 = int(anslist["cesd1"]) # 14
        cesd2 = int(anslist["cesd2"]) # 15
        cesd3 = int(anslist["cesd3"]) # 16
        cesd4 = int(anslist["cesd4"]) # 17
        cesd5 = int(anslist["cesd5"]) # 18
        cesd6 = int(anslist["cesd6"]) # 19
        cesd7 = int(anslist["cesd7"]) # 20
        cesd8 = int(anslist["cesd8"]) # 21
        cesd9 = int(anslist["cesd9"]) # 22
        cesd10 = int(anslist["cesd10"]) # 23
        cesd11 = int(anslist["cesd11"]) # 24
        cesd12 = int(anslist["cesd12"]) # 25
        cesd13 = int(anslist["cesd13"]) # 26
        cesd14 = int(anslist["cesd14"]) # 27
        cesd15 = int(anslist["cesd15"]) # 28
        cesd16 = int(anslist["cesd16"]) # 29
        cesd17 = int(anslist["cesd17"]) # 30
        cesd18 = int(anslist["cesd18"]) # 31
        cesd19 = int(anslist["cesd19"]) # 32
        cesd20 = int(anslist["cesd20"]) # 33
        sum = cesd1 + cesd2 + cesd3 + cesd4 + cesd5 + cesd6 + cesd7 + cesd8 + cesd9 + cesd10 + \
              cesd11 + cesd12 + cesd13 + cesd14 + cesd15 + cesd16 + cesd17 + cesd18 + cesd19 + cesd20
        if sum >= 16:
            return 2
        else:
            return 0

    except Exception as e:
        print("Exception in Depression")
        print(e)




## !!!!!!!!!! ABOUT YOUR ACTIVITY PART !!!!!!!!!!

## Scoring function for Physical activity factor
## Returns Protective Score
def Physical_Activity(anslist):
    try:
        ## parse the answer dictionary
        workvigorousdays = int(anslist["workvigorousdays"]) # 35
        workvhours = int(anslist["workvhours"]) # 36
        workmoddays = int(anslist["workmoddays"]) # 37
        workmodhours = int(anslist["workmodhours"]) # 38
        workwalkdays = int(anslist["workwalkdays"]) # 39
        workwalkhours = int(anslist["workwalkhours"]) # 40
        dayscycling = int(anslist["dayscycling"]) # 41
        hourscycling = int(anslist["hourscycling"]) # 42
        dayswalktrans = int(anslist["dayswalktrans"]) # 43
        hourswalktrans = int(anslist["hourswalktrans"]) # 44
        daysviggarden = int(anslist["daysviggarden"]) # 45
        hoursviggarden = int(anslist["hoursviggarden"]) # 46
        daysmodgarden = int(anslist["daysmodgarden"]) # 47
        hoursmodgarden = int(anslist["hoursmodgarden"]) # 48
        daysmodhome = int(anslist["daysmodhome"]) # 49
        hoursmodhome = int(anslist["hoursmodhome"]) # 50
        dayswalkleisure = int(anslist["dayswalkleisure"]) # 51
        hourswalkleisure = int(anslist["hourswalkleisure"]) # 52
        daysvigleisure = int(anslist["daysvigleisure"]) # 53
        hoursvigleisure = int(anslist["hoursvigleisure"]) # 54
        daysmodleisure = int(anslist["daysmodleisure"]) # 55
        hoursmodleisure = int(anslist["hoursmodleisure"]) # 56

        sum = ((workvigorousdays * workvhours * 8) + (workmoddays * workmodhours * 4) + (workwalkdays * workwalkhours * 3.3)
               +(dayscycling * hourscycling * 6) + (dayswalktrans * hourswalktrans * 3.3) + (daysviggarden * hoursviggarden * 5.5)
               +(daysmodgarden * hoursmodgarden * 4) + (daysmodhome * hoursmodhome * 3) + (dayswalkleisure * hourswalkleisure * 3.3)
               +(daysvigleisure * hoursvigleisure * 8) + (daysmodleisure * hoursmodleisure * 4))

        part_sum = ((workvigorousdays * workvhours * 8) + (daysvigleisure * hoursvigleisure * 8))
        if part_sum >= 1500 and part_sum <= 4000:
            return  -3
        elif sum < 600:
            return 0
        elif sum < 3000:
            return -2
        else:
            return -3

    except Exception as e:
        print("Exception in Physical_Activity")
        print(e)




## !!!!!!!!!! ABOUT YOUR LEISURE TIME PART !!!!!!!!!!

## Scoring function for Cognitive activity factor
## Returns Protective Score
def Cognitive_Activity(anslist):
    try:
        ## parse the answer dictionary
        reading_str = anslist["reading"] # 57
        newspaper_str = anslist["newspaper"] # 58
        magazines_str = anslist["magazines"] # 59
        books_str = anslist["books"] # 60
        games_str = anslist["games"] # 61
        brain_training_str = anslist["brain_training"] # 62
        letters_str = anslist["letters"] # 63
        socialnetworkactivities_str = anslist["socialnetworkactivities"] # 64
        museum_str = anslist["museum"] # 65
        concert_str = anslist["concert"] # 66
        library_str = anslist["library"] # 67

        domain_daily = {
            "Hiçbiri": 1,
            "Bir saatten az": 2,
            "Bir ila 2 saatten az": 3,
            "İki ila 3 saatten az": 4,
            "Üç saat veya daha fazla": 5,
            "Bilmiyorum": 9}

        domain_yearly = {
            "Her gün veya neredeyse her gün": 5,
            "Haftada birkaç kez": 4,
            "Ayda birkaç kez": 3,
            "Yılda birkaç kez": 2,
            "Yılda bir kez veya daha az": 1,
            "Bilmiyorum": 9}

        for k in domain_daily.keys():
            if reading_str == k:
                reading = domain_daily[k]

        for k in domain_yearly.keys():
            if newspaper_str == k:
                newspaper = domain_yearly[k]
            if magazines_str == k:
                magazines = domain_yearly[k]
            if books_str == k:
                books = domain_yearly[k]
            if games_str == k:
                games = domain_yearly[k]
            if brain_training_str == k:
                brain_training = domain_yearly[k]
            if letters_str == k:
                letters = domain_yearly[k]
            if socialnetworkactivities_str == k:
                socialnetworkactivities = domain_yearly[k]
            if museum_str == k:
                museum = domain_yearly[k]
            if concert_str == k:
                concert = domain_yearly[k]
            if library_str == k:
                library = domain_yearly[k]

        average =  ((reading + newspaper + magazines + books + games + brain_training + letters +
                 socialnetworkactivities + museum + concert + library) / 11)

        if average < 3:
            return 0
        elif average < 4:
            return -7
        else:
            return -6

    except Exception as e:
        print("Exception in Cognitive_Activity")
        print(e)




## !!!!!!!!!! ABOUT YOUR FRIENDS AND FAMILY PART !!!!!!!!!!

## Scoring function for Social network factor
## Returns Protective Score
def Social_Network(anslist):
    try:
        ## parse the answer dictionary
        numberoffriends_str = anslist["numberoffriends"] # 68
        satisfaction_str = anslist["satisfaction"] # 69
        socialgroups_str = anslist["socialgroups"] # 70
        livingstatus_str = anslist["livingstatus"] # 71
        marital_str = anslist["marital"] # 4

        if numberoffriends_str == "5-8" or numberoffriends_str == "Dokuz veya daha fazla":
            Friend = 2
        else:
            Friend = 1

        if marital_str == "Evli" or marital_str == "Fiili":
            Marital = 1
        else:
            Marital = 0

        if satisfaction_str == "Evet":
            satisfaction = 1
        else:
            satisfaction = 0

        if socialgroups_str == "Haftada bir kereden az":
            socialgroups = 0
        else:
            socialgroups = 1

        if livingstatus_str == "Yalnız veya sadece eşinizle":
            livingstatus = 0
        else:
            livingstatus = 1
            
        sum = Friend + Marital + satisfaction + socialgroups + livingstatus
        if sum >= 4:
            return 0
        elif sum == 3:
            return 1
        elif sum == 2:
            return 4
        else:
            return 6

    except Exception as e:
        print("Exception in Social_Network")
        print(e)










