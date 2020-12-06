

var quizzes = [
    ['Quiz1','daffodil',"1"],
    ['Quiz2','tulip',"2"],
    ['Quiz3','elephant',"3"]
]   

var questions = {
    Quiz1: 
        [
            ['daffodil',["daffodil", "cherryblossom", "sunflower", "waterlily"],"daffodil"],
            ['cherryblossom',["daisy", "sunflower", "lily", "cherryblossom"],"cherryblossom"],
            ['daisy',["waterlily", "cherryblossom", "daisy", "rose"],"daisy"],
            ['lily',["rose", "lily", "rose", "waterlily"],"lily"],
            ['rose',["tulip", "sunflower", "waterlily", "rose"],"rose"],
            ['sunflower',["sunflower", "tulip", "rose", "daisy"],"sunflower"],
        ],
    Quiz2:
        [
            ['tulip',["daisy", "waterlily", "lily", "tulip"],"tulip"],
            ['waterlily',["daffodil", "waterlily", "tulip", "cherryblossom"],"waterlily"],
            ['bear',["bear", "rat", "lion", "elephant"],"bear"],
            ['butter',["croissant", "butter", "milkshake", "fruit"],"butter"],
            ['cat',["rat", "lion", "cat", "bear"],"cat"],
            ['croissant',["bread", "butter", "milkshake", "croissant"],"croissant"],
        ],
    Quiz3:
        [
            ['elephant',["elephant", "cat", "rat", "bear"],"elephant"],
            ['fruit',["nut", "fruit", "wheat", "rice"],"fruit"],
            ['lion',["pardus", "cat", "lion", "tiger"],"lion"],
            ['milkshake',["egg", "soup", "milk", "milkshake"],"milkshake"],
            ['pie',["pie", "cake", "mooncake", "ice cream"],"pie"],
            ['rat',["cat", "rat", "lion", "tiger"],"rat"],
        ]
}

module.exports.quizzes = quizzes
module.exports.questions = questions