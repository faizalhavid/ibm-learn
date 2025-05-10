fun main(){
    val input = readInput("Day01")
    val elves = mutableListOf<Int>()
    var currentElf = 0

    for (line in input) {
        if (line.isEmpty()) {
            elves.add(currentElf)
            currentElf = 0
        } else {
            currentElf += line.toInt()
        }
    }
    elves.add(currentElf)

    println("Part 1: ${elves.maxOrNull()}")
    println("Part 2: ${elves.sortedDescending().take(3).sum()}")
}