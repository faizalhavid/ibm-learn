fun main() {
// Number Type data
    var a: Int = 10
    var b: Long = 20L
    var c: Short = 30
    var d: Byte = 40
    var e: Float = 50.0F
    var f: Double = 60.0
//  Conversation
    var a1: Int = b.toInt()
    var b1: Long = a.toLong()
    var c1: Short = a.toShort()
    var d1: Byte = a.toByte()
    var e1: Float = a.toFloat()
    var f1: Double = a.toDouble()

//   String Type data
    var str1: String = "Hello"
    var str2: String = "World"
    var address:String ="""
        |  123 Main St
        |  Cityville, ST 12345
        |  USA
        """
    var multilineString: String = """
        |  This is a multiline string
        |  that spans multiple lines.
        |  It can be used for documentation
        |  or any other purpose.
        """.trimMargin()
    val desc:String = "total $str1 char = ${str1.length} and $str2 char = ${str2.length}"
    println(multilineString)
    println(address)
    println(str1 + str2)
    println(desc)


//   Boolean Type data
    var isTrue: Boolean = true
    var isFalse: Boolean = false

//   Char Type data
    var char1:Char = 'A'
    var char2:Char = 'B'

//   Array Type data
    var arr1: Array<Int> = arrayOf(1,2,3,4,5)
    var arr2: Array<String> = arrayOf("Hello", "World")

}