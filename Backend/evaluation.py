
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






