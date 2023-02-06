/*    PROMPT

Basic Regex Parser
Implement a regular expression function isMatch that supports the '.' and '*' symbols. 
The function receives two strings - text and pattern - and should return true if the text 
matches the pattern as a regular expression. For simplicity, assume that the actual symbols '.' 
and '*' do not appear in the text string and are used as special symbols only in the pattern string.

In case you aren’t familiar with regular expressions, the function determines if the text and pattern 
are the equal, where the '.' is treated as a single a character wildcard (see third example), and '*' 
is matched for a zero or more sequence of the previous letter (see fourth and fifth examples). 
For more information on regular expression matching, see the Regular Expression Wikipedia page.

Explain your algorithm, and analyze its time and space complexities.

Examples:

input:  text = "aa", pattern = "a"
output: false

input:  text = "aa", pattern = "aa"
output: true

input:  text = "abc", pattern = "a.c"
output: true

input:  text = "abbb", pattern = "ab*"
output: true

input:  text = "acd", pattern = "ab*c."
output: true

Constraints:

[time limit] 5000ms
[input] string text
[input] string pattern
[output] boolean
*/

//    MY ATTEMPT

function isMatch(text, pattern) {
  let t = [...text];
  let p = [...pattern];

  while (t.length || p.length) {
    if (!t.length || !p.length) {
      if (!t.length && p.length === 2 && p[1] === '*') return true;
      return false;
    } else if (t[0] !== t[1] && p[1] !== '*') {
      if (t[0] !== p[0] && p[0] !== '.') return false;
      t.shift();
      p.shift();
    } else if (t[0] === t[1] && p[1] !== '*') {
      if (p[1] !== p[0]) return false;
      t.splice(0, to(t));
      p.splice(0, to(p));
    } else if (t[0] === t[1] && p[1] === '*') {
      if (t[0] === p[0]) {
        t.splice(0, to(t));
        p.splice(0, 2);
      }
    } else if (t[0] !== t[1] && p[1] === '*') {
      if (t[0] === p[0] || p[0] === '.') {
        t.shift();
        p.splice(0, 2);
      } else if (t[0] === p[2] || p[2] === '.') {
        t.shift();
        p.splice(0, 3);
      }
    }
  }

  function to(array) {
    let index = 0;
    for (let i = 0; i < array.length; i++) {
      index++;
      if (array[i + 1] !== array[i] && array[i + 1] !== '*') return index;
    }
  }

  return true;
}

/*    SOLUTION

function isMatch(text, pattern) {
  return isMatchHelper(text, pattern, 0, 0);

  function isMatchHelper(text, pattern, t, p) {
    if (t >= text.length) {
      if (p >= pattern.length) return true;
      else {
        if (p + 1 < pattern.length && pattern[p + 1] == '*')
          return isMatchHelper(text, pattern, t, p + 2);
        else return false;
      }
    } else if (p >= pattern.length && t < text.length) {
      return false;
    } else if (p + 1 < pattern.length && pattern[p + 1] == '*') {
      if (pattern[p] == '.' || text[t] == pattern[p])
        return (
          isMatchHelper(text, pattern, t, p + 2) ||
          isMatchHelper(text, pattern, t + 1, p)
        );
      else return isMatchHelper(text, pattern, t, p + 2);
    } else if (pattern[p] == '.' || pattern[p] == text[t]) {
      return isMatchHelper(text, pattern, t + 1, p + 1);
    } else return false;
  }
}
*/
