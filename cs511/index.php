<?php
// Start session
session_start();

// Reset all data
if (isset($_POST['reset'])) {
    session_destroy();
    header("Location: index.php");
    exit();
}

// Create session array
if (!isset($_SESSION['students'])) {
    $_SESSION['students'] = [];
}

// Store student marks
if (isset($_POST['submit'])) {

    $marks = intval($_POST['marks']);

    // Store only 20 students
    if (count($_SESSION['students']) < 20) {

        // Check eligibility
        if ($marks >= 80) {
            $status = "Eligible";
        } else {
            $status = "Not Eligible";
        }

        // Save data
        $_SESSION['students'][] = [
            "marks" => $marks,
            "status" => $status
        ];
    }
}

$total = count($_SESSION['students']);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Scholarship Eligibility System</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

<div class="container">

    <h1>Student Scholarship Eligibility System</h1>

    <?php if ($total < 20) { ?>

        <h3>Student <?php echo $total + 1; ?> of 20</h3>

        <!-- Marks Form -->
        <form method="POST">

            <label>Enter Student Marks</label>

            <input
                type="number"
                name="marks"
                min="0"
                max="100"
                required
            >

            <button type="submit" name="submit">
                Submit
            </button>

        </form>

    <?php } ?>

    <?php if ($total == 20) { ?>

        <h2>Scholarship Eligible Students</h2>

        <table>

            <tr>
                <th>Serial Number</th>
                <th>Marks</th>
            </tr>

            <?php
            $serial = 1;

            foreach ($_SESSION['students'] as $student) {

                if ($student['status'] == "Eligible") {

                    echo "<tr>";
                    echo "<td>".$serial++."</td>";
                    echo "<td>".$student['marks']."</td>";
                    echo "</tr>";
                }
            }
            ?>

        </table>

        <h2>Not Eligible Students</h2>

        <table>

            <tr>
                <th>Serial Number</th>
                <th>Marks</th>
            </tr>

            <?php
            $serial = 1;

            foreach ($_SESSION['students'] as $student) {

                if ($student['status'] == "Not Eligible") {

                    echo "<tr>";
                    echo "<td>".$serial++."</td>";
                    echo "<td>".$student['marks']."</td>";
                    echo "</tr>";
                }
            }
            ?>

        </table>

        <!-- Reset Button -->
        <form method="POST">

            <button type="submit" name="reset">
                Reset All
            </button>

        </form>

    <?php } ?>

</div>

</body>
</html>