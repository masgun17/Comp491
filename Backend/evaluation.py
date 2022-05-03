
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
        cesd1 = int(anslist["cesd1"])
        cesd2 = int(anslist["cesd2"])
        cesd3 = int(anslist["cesd3"])
        cesd4 = int(anslist["cesd4"])
        cesd5 = int(anslist["cesd5"])
        cesd6 = int(anslist["cesd6"])
        cesd7 = int(anslist["cesd7"])
        cesd8 = int(anslist["cesd8"])
        cesd9 = int(anslist["cesd9"])
        cesd10 = int(anslist["cesd10"])
        cesd11 = int(anslist["cesd11"])
        cesd12 = int(anslist["cesd12"])
        cesd13 = int(anslist["cesd13"])
        cesd14 = int(anslist["cesd14"])
        cesd15 = int(anslist["cesd15"])
        cesd16 = int(anslist["cesd16"])
        cesd17 = int(anslist["cesd17"])
        cesd18 = int(anslist["cesd18"])
        cesd19 = int(anslist["cesd19"])
        cesd20 = int(anslist["cesd20"])
        sum = cesd1 + cesd2 + cesd3 + cesd4 + cesd5 + cesd6 + cesd7 + cesd8 + cesd9 + cesd10 + \
              cesd11 + cesd12 + cesd13 + cesd14 + cesd15 + cesd16 + cesd17 + cesd18 + cesd19 + cesd20
        if sum >= 16:
            return 2
        else:
            return 0

    except Exception as e:
        print("Exception in Depression")
        print(e)








