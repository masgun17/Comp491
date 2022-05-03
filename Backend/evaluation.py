
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
        education_p = int(anslist["[education_p]"])
        education_h = int(anslist["[education_h]"])
        education_t = int(anslist["[education_t]"])
        education_u = int(anslist["[education_u]"])
        education_o = int(anslist["[education_o]"])
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

        if (age>=18) and (age<=59):
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

        if age < 60:
            if cholesterol == "Evet":
                return 3
            elif cholesterol == "Hayır":
                return 0
            elif cholesterol_level > 6.5:
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









