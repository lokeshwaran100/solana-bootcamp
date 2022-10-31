fn main() {
    println!("welcome");
    fizz_buzz(302);

    fn fizz_buzz(max_count: u32) {
        let mut number = 1;
        let mut fizz_buzz_cnt = 0;
        while number != max_count {
            
            if number%3 == 0 && number%5 == 0 {
                fizz_buzz_cnt += 1;
                println!("fizz buzz")
            } else if number%3 == 0 {
                println!("fizz")
            } else if number%3 == 0 {
                println!("buzz")
            }
    
            number += 1;
        }
        println!("fizz buzz occured {}", fizz_buzz_cnt)
    }
}
