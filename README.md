# test-generator

Demo should be available [here](https://bruceandylee.github.io/test-generator/)

## Installation for local use

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### navigate to the page

you should see an example for a vertex table
![image](https://github.com/user-attachments/assets/17cc6910-0d1f-443b-823e-48d12f1a253e)

toggle to edge tests to see an example of a transition-based table
<img width="1332" alt="Screenshot 2024-09-13 at 18 14 43" src="https://github.com/user-attachments/assets/d8cbb4b4-933c-488b-997a-37ab967c924a">

###

1. Paste your table
2. See what columns the UI has parsed for you in the left-hand side column
3. Specify which columns should be included in which stage of your test
  1. **setup** or **elements** for vertex-tests
  2. **setup**, **transition** or **elements** for edge-tests 
