export default function Description() {
  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Linear Search Problem</h1>
      <p>
        You are given <code>t</code> testcases. For each testcase, you are given an integer <code>n</code>, the size of the array, followed by an integer <code>key</code> to be found in the array.
        Next, you are given <code>n</code> integers, the elements of the array. Your task is to find the index of the key in the array using linear search.
        If the key is not present in the array, output <code>-1</code> for that testcase.
      </p>
      <h5>Input</h5>
      <p>
        The first line of input contains an integer <code>t</code>, the number of testcases. Each testcase is described as follows:
        <ul>
          <li>The first line of each testcase contains two space-separated integers <code>n</code> and <code>key</code>.</li>
          <li>The second line of each testcase contains <code>n</code> space-separated integers, the elements of the array.</li>
        </ul>
      </p>
      <h5>Output</h5>
      <p>
        For each testcase, output a single integer representing the index of the key in the array. If the key is not present, output <code>-1</code>.
      </p>
      <h5>Constraints</h5>
      <ul>
        <li>1 ≤ t ≤ 10</li>
        <li>1 ≤ n ≤ 100</li>
        <li>-1000 ≤ key, array elements ≤ 1000</li>
      </ul>
      <h3>Example</h3>
      <br /><br />
      <pre>
        <b><h5>Input</h5></b>
        5 <br />
        5 3<br />
        1 2 3 4 5<br />
        4 0<br />
        -1 -1 -1 -1<br />
        10 12<br />
        1 2 3 4 5 6 7 8 9 10<br />
        2 1<br />
        1 2<br />
        5 100<br />
        1 2 3 100 4<br />
        <br /><br /><br />
        <b><h5>Output</h5></b>
        2<br />
        -1<br />
        -1<br />
        1<br />
        3<br />
      </pre>
    </div>
  )
}