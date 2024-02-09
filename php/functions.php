
// Register a custom REST API endpoint for handling form submissions
add_action('rest_api_init', 'register_custom_endpoint');

function register_custom_endpoint() {
    register_rest_route('custom-plugin/v1', '/contact-form', array(
        'methods' => 'POST',
        'callback' => 'handle_form_submission',
    ));
}

// Callback function to handle form submissions
function handle_form_submission($request) {
    // Retrieve form data from the request
    $params = $request->get_params();

    // Process form data (e.g., save to database, send email, etc.)
    // Example: Saving form data to the database
    $name = sanitize_text_field($params['name']);
    $email = sanitize_email($params['email']);
    $subject = sanitize_text_field($params['subject']);
    $message = sanitize_textarea_field($params['message']);

    // Perform validation if needed
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        return new WP_REST_Response(array('message' => 'Incomplete form data'), 400);
    }

    // Example: Inserting form data into a custom database table
    global $wpdb;
    $table_name = $wpdb->prefix . 'contact_form_entries';
    $wpdb->insert($table_name, array(
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message,
        'created_at' => current_time('mysql'),
    ));

    // Example: Sending email notification
    wp_mail('admin@example.com', 'New Form Submission', 'A new form submission has been received.');

    // Return a response
    return new WP_REST_Response(array('message' => 'Form submitted successfully'), 200);
}
